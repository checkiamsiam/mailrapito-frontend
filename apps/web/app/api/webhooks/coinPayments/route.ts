import { createApiCaller } from "api/trpc/caller";
import { createHmac, timingSafeEqual } from "crypto";
import { parse } from "querystring";

const secret = "4S$eJ#8dLpM3aD*G4KbFhE1iR$cC9mN7wX";

interface CustomData {
  orderId: string;
  email: string;
  status?: string;
}

interface Payload {
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
  custom: CustomData;
  on1?: string;
  ov1?: string;
  on2?: string;
  ov2?: string;
  send_tx?: string;
  received_amount: number;
  received_confirms: number;
}

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const parsedData = parse(text);
    const signatureHeader = req.headers.get("Hmac");
    const hmac = createHmac("sha512", secret);
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(signatureHeader ?? "", "utf8");

    if (!timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const customData: CustomData = JSON.parse(parsedData.custom as string);
    const payload: Payload = {
      ipn_type: parsedData.ipn_type as string,
      ipn_mode: parsedData.ipn_mode as string,
      merchant: parsedData.merchant as string,
      status: parsedData.status
        ? parseInt(parsedData.status as string, 10)
        : undefined,
      status_text: parsedData.status_text as string,
      txn_id: parsedData.txn_id as string,
      currency1: parsedData.currency1 as string,
      currency2: parsedData.currency2 as string,
      amount1: parseFloat(parsedData.amount1 as string),
      amount2: parseFloat(parsedData.amount2 as string),
      subtotal: parseFloat(parsedData.subtotal as string),
      shipping: parseFloat(parsedData.shipping as string),
      tax: parseFloat(parsedData.tax as string),
      fee: parseFloat(parsedData.fee as string),
      net: parseFloat((parsedData.net as string) ?? 0.0),
      item_amount: parseFloat(parsedData.item_amount as string),
      item_name: parsedData.item_name as string,
      item_desc: (parsedData.item_desc as string) ?? "",
      item_number: (parsedData.item_number as string) ?? "",
      invoice: (parsedData.invoice as string) ?? "",
      custom: customData,
      on1: (parsedData.on1 as string) ?? "",
      ov1: (parsedData.ov1 as string) ?? "",
      on2: (parsedData.on2 as string) ?? "",
      ov2: (parsedData.ov2 as string) ?? "",
      send_tx: (parsedData.send_tx as string) ?? "",
      received_amount: parseFloat(parsedData.received_amount as string),
      received_confirms: parseInt(parsedData.received_confirms as string, 10),
    };

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

    if (!payload) {
      return new Response("Invalid payload.", {
        status: 400,
      });
    }

    if (payload.ipn_type !== "simple") {
      return new Response("IPN type is not a simple button.", {
        status: 400,
      });
    }

    if (typeof payload.status === "number") {
      if (payload?.status < 0) {
        return new Response("Failures / Errors", {
          status: 400,
        });
      }
      if (payload.status >= 0 && payload.status < 100) {
        return new Response("Payment is Pending in some way.", {
          status: 202,
        });
      }
      if (payload.status >= 100) {
        const isPaymentReceived = await apiCaller.payments.getPaymentInfo({
          txid: payload.txn_id,
          full: 0,
        });

        if (isPaymentReceived.status === 0) {
          return new Response("Payment is pending.", {
            status: 400,
          });
        } else if (isPaymentReceived.status === 1) {
          await apiCaller.payments.createSubscription({
            id: String(payload.txn_id),
            orderId: payload.custom.orderId,
            txnId: payload.txn_id,
            itemAmount: payload.item_amount,
            receivedAmount: payload.received_amount,
            receivedConfirms: payload.received_confirms,
            status: "PAID",
            firstCurrency: payload.currency1,
            secondCurrency: payload.currency2,
            firstAmount: payload.amount1,
            secondAmount: payload.amount2,
            email: payload.custom.email,
            paidAt: new Date(),
          });
        } else if (isPaymentReceived.status < 0) {
          return new Response("Cancelled / Timed Out.", {
            status: 400,
          });
        }
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

  return new Response("Payment success", {
    status: 204,
  });
}
