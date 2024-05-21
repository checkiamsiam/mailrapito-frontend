import { createApiCaller } from "api/trpc/caller";
import { parse } from "querystring";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const parsedData = parse(text);
    const jsonData = JSON.parse(Object.keys(parsedData)[0]);

    //TODO: Implement HMAC signature verification

    // const secret = "4S$eJ#8dLpM3aD*G4KbFhE1iR$cC9mN7wX";
    // const signatureHeader = req.headers.get("Hmac");
    // const hmac = createHmac("sha512", secret);
    // const digest = Buffer.from(
    //   hmac.update(await clonedReq.text()).digest("hex"),
    //   "utf8",
    // );
    // const signature = Buffer.from(req.headers.get("Hmac") ?? "", "utf8");
    // if (!timingSafeEqual(digest, signature)) {
    //   return new Response("Invalid signature.", {
    //     status: 400,
    //   });
    // }

    const payload = jsonData as {
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
      item_amount: number;
      item_name: string;
      item_desc?: string;
      item_number?: string;
      invoice?: string;
      custom: {
        orderId: string;
        email: string;
      };
      on1?: string;
      ov1?: string;
      on2?: string;
      ov2?: string;
      send_tx?: string;
      received_amount: number;
      received_confirms: number;
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

    if (!data?.custom.orderId) {
      throw new Error("Invalid payload.");
    }

    if (data?.ipn_type !== "simple") {
      return new Response("IPN type is not a simple button.", {
        status: 400,
      });
    }

    if (data?.status) {
      if (data?.status >= 100 || data?.status === 2) {
        const isPaymentReceived = await apiCaller.payments.getPaymentInfo({
          txid: data.txn_id,
          full: 0,
        });

        if (isPaymentReceived.status === 0) {
          return new Response("Payment not received.", {
            status: 400,
          });
        } else if (isPaymentReceived.status === 1) {
          await apiCaller.payments.createSubscription({
            id: String(data.txn_id),
            orderId: data.custom.orderId,
            txnId: data.txn_id,
            itemAmount: data.item_amount,
            receivedAmount: data.received_amount,
            receivedConfirms: data.received_confirms,
            status: "PAID",
            firstCurrency: data.currency1,
            secondCurrency: data.currency2,
            firstAmount: data.amount1,
            secondAmount: data.amount2,
            email: data.custom.email,
            paidAt: new Date(),
          });
        }
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

  return new Response(`Payment success`, {
    status: 204,
  });
}
