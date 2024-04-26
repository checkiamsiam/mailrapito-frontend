import { createApiCaller } from "api/trpc/caller";
import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    console.log("🚀 ~ POST ~ text:", text);
    const hmac = createHmac("sha256", process.env.COINPAYMENT_API_SECRET!);
    const signatureHeader = headers().get("HTTP_HMAC")!;
    console.log("🚀 ~ POST ~ signatureHeader:", signatureHeader);
    const signatureParts = signatureHeader
      .split(",")
      .map((part) => part.split("="));
    const signatureKey =
      signatureParts.find((part) => part[0] === "v1")?.[1] ?? "";
    const signatureTimestamp =
      signatureParts.find((part) => part[0] === "t")?.[1] ?? "";
    const digest = Buffer.from(
      hmac.update(`${signatureTimestamp}.${text}`).digest("hex"),
      "utf8",
    );
    const signature = Buffer.from(signatureKey, "utf8");

    if (!timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = JSON.parse(text) as {
      ipn_type: string;
      ipn_mode: string;
      merchant: string;
      status?: number;
      status_text: string;
      txn_id: string;
      currency1: string;
      currency2: string;
      amount1: number;
      amount2: number;
      subtotal: number;
      shipping: number;
      tax: number;
      fee: number;
      net: number;
      item_amount: string | number;
      item_name: string;
      item_desc?: string;
      item_number?: string | number;
      invoice?: string;
      custom: {
        order_id: string;
      };
      on1?: string;
      ov1?: string;
      on2?: string;
      ov2?: string;
      send_tx?: string;
      received_amount?: string | number;
      received_confirms?: string | number;
    } | null;

    const type = payload?.ipn_type ?? null;

    if (!type || !["simple"].includes(type)) {
      return new Response("Invalid event type.", {
        status: 400,
      });
    }

    if (payload?.merchant !== process.env.COINPAYMENT_MERCHANT_ID) {
      return new Response("Invalid merchant.", {
        status: 400,
      });
    }

    const apiCaller = await createApiCaller();

    const data = payload;

    if (!data?.custom.order_id) {
      throw new Error("Invalid payload.");
    }

    if (data?.ipn_type !== "simple") {
      return new Response("IPN type is not a simple button.", {
        status: 400,
      });
    }

    if (data?.status) {
      if (data?.status >= 100 || data?.status === 2) {
        await apiCaller.payments.createSubscription({
          id: String(data.txn_id),
          orderId: data.custom.order_id,
          txnId: data.txn_id,
          itemAmount: data.item_amount.toString(),
          receivedAmount: data.received_amount
            ? data.received_amount.toString()
            : "",
          receivedConfirms: data.received_confirms
            ? data.received_confirms.toString()
            : "",
          status: "PAID",
          currency1: data.currency1,
          currency2: data.currency2,
          amount1: data.amount1.toString(),
          amount2: data.amount2.toString(),
          email: "",
        });
      } else if (data?.status < 0) {
        return new Response("Cancelled / Timed Out.", {
          status: 400,
        });
      } else if (data?.status > 0 && data?.status < 100) {
        return new Response("Payment is pending.", {
          status: 202,
        });
      }
    }
  } catch (error: unknown) {
    return new Response(
      `Webhook error: ${error instanceof Error ? error.message : ""}`,
      {
        status: 400,
      },
    );
  }

  return new Response(null, {
    status: 204,
  });
}
