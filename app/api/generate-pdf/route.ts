import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { pdfUrl } = await req.json();

    if (!pdfUrl) {
      return new NextResponse(JSON.stringify({ message: "Invalid pdf Url." }), {
        status: 400,
      });
    }

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(pdfUrl, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      // margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
      scale: 1,
    });

    await page.close();
    await browser.close();

    const blob = new Blob([new Uint8Array(pdfBuffer)], {
      type: "application/pdf",
    });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="generated-document.pdf"',
      },
      status: 200,
    });
  } catch (error) {
    console.error("Generate pdf error: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to generate PDF." }),
      { status: 500 }
    );
  }
}
