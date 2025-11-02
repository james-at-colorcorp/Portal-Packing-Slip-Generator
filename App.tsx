
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Order, LineItem } from './types';

const FROM_ADDRESS = {
  name: 'Colorcorp',
  street: '277 Toombul Rd',
  cityStateZip: 'Northgate Queensland 4013',
  phone: '0738532222',
};

const skuMaterials = [
  { "SKU": "S001", "Materials": "Double-sided PVC panel with suction cup hooks" },
  { "SKU": "S002", "Materials": "Double-sided PVC panel with suction cup hooks" },
  { "SKU": "S001 or S002", "Materials": "Double-sided PVC panel with suction cup hooks" },
  { "SKU": "S003", "Materials": "SAV" },
  { "SKU": "S003_L", "Materials": "SAV" },
  { "SKU": "S003_R", "Materials": "SAV" },
  { "SKU": "S003", "Materials": "SAV. SET OF TWO." },
  { "SKU": "S004", "Materials": "SAV. SET OF TWO." },
  { "SKU": "S003_S or S004", "Materials": "SAV. SET OF TWO." },
  { "SKU": "S005", "Materials": "ACM" },
  { "SKU": "S005_L", "Materials": "ACM" },
  { "SKU": "S005_R", "Materials": "ACM" },
  { "SKU": "S006", "Materials": "ACM" },
  { "SKU": "S006_L", "Materials": "ACM" },
  { "SKU": "S006_R", "Materials": "ACM" },
  { "SKU": "S007", "Materials": "ACM" },
  { "SKU": "S007_L", "Materials": "ACM" },
  { "SKU": "S007_R", "Materials": "ACM" },
  { "SKU": "S008_AU", "Materials": "ACM" },
  { "SKU": "S009_NZ", "Materials": "ACM" },
  { "SKU": "S010", "Materials": "Single-sided PVC panel with suction cup hooks" },
  { "SKU": "S011_AU", "Materials": "ACM" },
  { "SKU": "S012_AU", "Materials": "ACM" },
  { "SKU": "S013", "Materials": "ACM" },
  { "SKU": "S014_AU", "Materials": "CORFLUTE" },
  { "SKU": "S015_AU", "Materials": "CORFLUTE" },
  { "SKU": "S016_AU", "Materials": "CORFLUTE" },
  { "SKU": "S017_AU", "Materials": "CORFLUTE" },
  { "SKU": "S018_AU", "Materials": "CORFLUTE" },
  { "SKU": "S019_AU", "Materials": "CORFLUTE" },
  { "SKU": "S020_AU", "Materials": "CORFLUTE" },
  { "SKU": "S021_AU", "Materials": "ACM" },
  { "SKU": "S022_AU", "Materials": "ACM" },
  { "SKU": "S023_NZ", "Materials": "ACM" },
  { "SKU": "S024_NZ", "Materials": "ACM" },
  { "SKU": "S025", "Materials": "ACM" },
  { "SKU": "S026", "Materials": "ACM" },
  { "SKU": "S027", "Materials": "ACM" },
  { "SKU": "S028_AU", "Materials": "ACM" },
  { "SKU": "S029_NZ", "Materials": "ACM" },
  { "SKU": "S030", "Materials": "ACM" },
  { "SKU": "S031_AU", "Materials": "ACM" },
  { "SKU": "S032_NZ", "Materials": "ACM" },
  { "SKU": "S033", "Materials": "ACM" },
  { "SKU": "S034", "Materials": "ACM" },
  { "SKU": "S035", "Materials": "ACM" },
  { "SKU": "S036", "Materials": "ACM" },
  { "SKU": "S037", "Materials": "ACM" },
  { "SKU": "S038", "Materials": "ACM" },
  { "SKU": "S039", "Materials": "ACM" },
  { "SKU": "S040", "Materials": "ACM" },
  { "SKU": "S041", "Materials": "ACM" },
  { "SKU": "S042", "Materials": "ACM" },
  { "SKU": "S042_L", "Materials": "ACM" },
  { "SKU": "S042_R", "Materials": "ACM" },
  { "SKU": "S043", "Materials": "ACM" },
  { "SKU": "S044", "Materials": "ACM" },
  { "SKU": "S045", "Materials": "ACM" },
  { "SKU": "S046", "Materials": "ACM" },
  { "SKU": "S046_L", "Materials": "ACM" },
  { "SKU": "S046_R", "Materials": "ACM" },
  { "SKU": "S047", "Materials": "ACM" },
  { "SKU": "S047_1", "Materials": "ACM" },
  { "SKU": "S047_2", "Materials": "ACM" },
  { "SKU": "S047_3", "Materials": "ACM" },
  { "SKU": "S047_4", "Materials": "ACM" },
  { "SKU": "S047_5", "Materials": "ACM" },
  { "SKU": "S047_6", "Materials": "ACM" },
  { "SKU": "S047_7", "Materials": "ACM" },
  { "SKU": "S047_8", "Materials": "ACM" },
  { "SKU": "S047_9", "Materials": "ACM" },
  { "SKU": "S048_AU", "Materials": "ACM" },
  { "SKU": "S049_NZ", "Materials": "ACM" },
  { "SKU": "S050_AU", "Materials": "ACM" },
  { "SKU": "S051_AU", "Materials": "ACM" },
  { "SKU": "S052_AU", "Materials": "ACM" },
  { "SKU": "S053_NZ", "Materials": "ACM" },
  { "SKU": "S054_NZ", "Materials": "ACM" },
  { "SKU": "S055_NZ", "Materials": "ACM" },
  { "SKU": "S056", "Materials": "ACM" },
  { "SKU": "S056_L", "Materials": "ACM" },
  { "SKU": "S056_R", "Materials": "ACM" },
  { "SKU": "S057", "Materials": "ACM" },
  { "SKU": "S057_L", "Materials": "ACM" },
  { "SKU": "S057_R", "Materials": "ACM" },
  { "SKU": "S058", "Materials": "ACM" },
  { "SKU": "S058_L", "Materials": "ACM" },
  { "SKU": "S058_R", "Materials": "ACM" },
  { "SKU": "S059", "Materials": "ACM" },
  { "SKU": "S060", "Materials": "ACM" },
  { "SKU": "S061", "Materials": "ACM" },
  { "SKU": "S062", "Materials": "ACM" },
  { "SKU": "S063", "Materials": "ACM" },
  { "SKU": "S064", "Materials": "ACM" },
  { "SKU": "S065", "Materials": "ACM" },
  { "SKU": "S066", "Materials": "ACM" },
  { "SKU": "S067", "Materials": "ACM" },
  { "SKU": "S068", "Materials": "ACM" },
  { "SKU": "S069", "Materials": "ACM" },
  { "SKU": "S070", "Materials": "ACM" },
  { "SKU": "S071_AU", "Materials": "ACM" },
  { "SKU": "S072_NZ", "Materials": "ACM" },
  { "SKU": "S073", "Materials": "ACM" },
  { "SKU": "S074", "Materials": "Double-sided PVC sign with holes in top corners." },
  { "SKU": "S075", "Materials": "ACM" },
  { "SKU": "S076", "Materials": "ACM" },
  { "SKU": "S077", "Materials": "ACM" },
  { "SKU": "S078", "Materials": "ACM" },
  { "SKU": "S079", "Materials": "ACM" },
  { "SKU": "S080", "Materials": "ACM" },
  { "SKU": "S081", "Materials": "ACM" },
  { "SKU": "S082_AU", "Materials": "ACM" },
  { "SKU": "S083_NZ", "Materials": "ACM" },
  { "SKU": "S084", "Materials": "ACM" },
  { "SKU": "S085", "Materials": "ACM" },
  { "SKU": "S086", "Materials": "ACM" },
  { "SKU": "S087", "Materials": "ACM" },
  { "SKU": "S088_NZ", "Materials": "ACM" },
  { "SKU": "S089_NZ", "Materials": "ACM" },
  { "SKU": "S090_NZ", "Materials": "CORFLUTE" },
  { "SKU": "S091_NZ", "Materials": "CORFLUTE" },
  { "SKU": "S092_NZ", "Materials": "CORFLUTE" },
  { "SKU": "S093_NZ", "Materials": "CORFLUTE" },
  { "SKU": "S094_NZ", "Materials": "CORFLUTE" },
  { "SKU": "S095_NZ", "Materials": "CORFLUTE" }
];

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const PLACEHOLDER_SVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgc3R5bGU9ImZpbGw6ICNmMmYzZjU7IiAvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlyeT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMHB4IiBmaWxsPSIjY2FkMWQ4Ij5JbWFnZSBFcnJvcjwvdGV4dD4KPC9zdmc+Cg==`;
const PHONE_REGEX = /(\b1300[\s-]?\d{3}[\s-]?\d{3}\b|\b04\d{2}[\s-]?\d{3}[\s-]?\d{3}\b|\b\+61[\s-]?4\d{2}[\s-]?\d{3}[\s-]?\d{3}\b|\b(?:\(?0[2378]\)?)[\s-]?\d{4}[\s-]?\d{4}\b|\b(?:\(?0[34679]\)?)[\s-]?\d{3}[\s-]?\d{4}\b|\b\+64[\s-]?2\d{1}[\s-]?\d{3,}[\s-]?\d{3,}\b|\b\d{4}[\s-]?\d{4,}\b)/gi;

const highlightPhoneNumbers = (text: string | number) => {
    const textStr = String(text);
    const parts = textStr.split(PHONE_REGEX);

    return (
        <React.Fragment>
            {parts.map((part, i) => {
                if (i % 2 !== 1 || !part) {
                    return part; // Not a matched phone number part
                }
                
                // For simplicity and to avoid formatting errors, just highlight the matched number.
                return (
                    <span key={i} className="bg-yellow-200 font-semibold px-1 rounded">
                        {part}
                    </span>
                );
            })}
        </React.Fragment>
    );
};


// --- Native PDF Generation Logic ---
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
};

const imageToBase64 = async (url: string) => {
    try {
        const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await fetch(proxiedUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const blob = await response.blob();
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Error converting image to base64: ${url}`, error);
        return PLACEHOLDER_SVG;
    }
};

const drawTextWithHighlights = (pdf: any, text: string, x: number, y: number, options: any = {}) => {
    const textStr = String(text);
    const parts = textStr.split(PHONE_REGEX);
    let currentX = x;

    pdf.setFont(options.font || 'helvetica', options.fontStyle || 'normal');
    pdf.setFontSize(options.fontSize || 10);
    pdf.setTextColor(options.textColor || '#000000');

    parts.forEach((part, i) => {
        if (i % 2 === 1 && part) { // It's a matched phone number
            // To avoid formatting errors, just draw the matched number in bold.
            pdf.setFont(options.font || 'helvetica', 'bold');
            pdf.text(part, currentX, y);
            currentX += pdf.getStringUnitWidth(part) * (options.fontSize || 10) / pdf.internal.scaleFactor;
            pdf.setFont(options.font || 'helvetica', options.fontStyle || 'normal');
        } else if (part) { // It's normal text
            pdf.text(part, currentX, y);
            currentX += pdf.getStringUnitWidth(part) * (options.fontSize || 10) / pdf.internal.scaleFactor;
        }
    });
};


const MARGIN = 40;
const LINE_HEIGHT = 1.15;
const FONT_SIZE_LG = 12;
const FONT_SIZE_MD = 10;
const FONT_SIZE_SM = 8;
const FONT_SIZE_XL = 24;
const PDF_COL_SPANS = [3, 1.5, 0.5, 2.5, 4.5]; // Image, SKU, Qty, Media, Product

const calculateItemHeight = (pdf: any, item: LineItem, skuToMaterialMap: Map<string, string>) => {
    const DOC_WIDTH = pdf.internal.pageSize.getWidth() - MARGIN * 2;
    const totalUnits = PDF_COL_SPANS.reduce((a, b) => a + b, 0);
    const unitWidth = DOC_WIDTH / totalUnits;

    const PRODUCT_COL_WIDTH = PDF_COL_SPANS[4] * unitWidth;
    const MEDIA_COL_WIDTH = PDF_COL_SPANS[3] * unitWidth;

    const METADATA_LINE_HEIGHT = FONT_SIZE_SM * LINE_HEIGHT;
    const PADDING = 10;
    
    let baseHeight = 140; // Base height for image (120) and padding

    pdf.setFontSize(FONT_SIZE_SM);
    const productNameLines = pdf.splitTextToSize(item.name, PRODUCT_COL_WIDTH);
    const productNameHeight = productNameLines.length * FONT_SIZE_SM * LINE_HEIGHT;

    let metaDataHeight = 0;
    item.meta_data.forEach(meta => {
        const displayValue = String(meta.display_value || meta.value).replace(/<[^>]+>/g, '');
        if (displayValue && meta.key !== '_wapf_meta') {
            metaDataHeight += METADATA_LINE_HEIGHT;
        }
    });

    const mediaText = skuToMaterialMap.get(item.sku) || 'N/A';
    pdf.setFontSize(FONT_SIZE_MD);
    const mediaLines = pdf.splitTextToSize(mediaText, MEDIA_COL_WIDTH);
    const mediaHeight = mediaLines.length * FONT_SIZE_MD * LINE_HEIGHT;


    return Math.max(baseHeight, productNameHeight + metaDataHeight, mediaHeight) + PADDING;
};


const calculatePageLayout = (pdf: any, order: Order, skuToMaterialMap: Map<string, string>) => {
    const pages: LineItem[][] = [];
    let currentPageItems: LineItem[] = [];

    const PAGE_HEIGHT = pdf.internal.pageSize.getHeight();
    const USABLE_PAGE_HEIGHT_FIRST = PAGE_HEIGHT - MARGIN - 150; // Space for header
    const USABLE_PAGE_HEIGHT_SUBSEQUENT = PAGE_HEIGHT - MARGIN - 80; // Space for smaller header

    let currentY = 0;
    let pageIndex = 0;

    for (const item of order.line_items) {
        const itemHeight = calculateItemHeight(pdf, item, skuToMaterialMap);
        const usableHeight = pageIndex === 0 ? USABLE_PAGE_HEIGHT_FIRST : USABLE_PAGE_HEIGHT_SUBSEQUENT;

        if (currentY + itemHeight > usableHeight && currentPageItems.length > 0) {
            pages.push(currentPageItems);
            currentPageItems = [];
            currentY = 0;
            pageIndex++;
        }
        currentPageItems.push(item);
        currentY += itemHeight;
    }

    if (currentPageItems.length > 0) {
        pages.push(currentPageItems);
    }

    return pages;
};

const drawHeader = (pdf: any, order: Order, isContinuation: boolean) => {
    const DOC_WIDTH = pdf.internal.pageSize.getWidth() - MARGIN * 2;
    const totalUnits = PDF_COL_SPANS.reduce((a, b) => a + b, 0);
    const unitWidth = DOC_WIDTH / totalUnits;
    let currentY = MARGIN;

    // Main Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(FONT_SIZE_XL);
    pdf.text('Packing slip', MARGIN, currentY);

    // Order Number
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(FONT_SIZE_LG);
    pdf.text(`Order No.: ${order.number}`, MARGIN + DOC_WIDTH, currentY - 10, { align: 'right' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(FONT_SIZE_MD);
    pdf.text(`Order Date: ${formatDate(order.date_created)}`, MARGIN + DOC_WIDTH, currentY + 5, { align: 'right' });

    currentY += 20;
    pdf.setDrawColor('#e5e7eb');
    pdf.line(MARGIN, currentY, MARGIN + DOC_WIDTH, currentY);
    currentY += 20;

    // Address section only on the first page
    if (!isContinuation) {
        const fromCol = MARGIN;
        const shipToCol = MARGIN + (PDF_COL_SPANS[0] + PDF_COL_SPANS[1] + PDF_COL_SPANS[2] + PDF_COL_SPANS[3]) * unitWidth;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(FONT_SIZE_SM);
        pdf.setTextColor('#6b7280');
        pdf.text('FROM', fromCol, currentY);
        pdf.text('SHIP TO', shipToCol, currentY);
        currentY += 15;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(FONT_SIZE_MD);
        pdf.setTextColor('#111827');
        pdf.text(FROM_ADDRESS.name, fromCol, currentY);

        pdf.setFont('helvetica', 'normal');
        pdf.text(`${order.shipping.first_name} ${order.shipping.last_name}`, shipToCol, currentY);
        currentY += 15;

        drawTextWithHighlights(pdf, FROM_ADDRESS.street, fromCol, currentY, { fontSize: FONT_SIZE_MD });
        pdf.setFont('helvetica', 'bold');
        pdf.text(order.shipping.company, shipToCol, currentY);
        currentY += 15;

        drawTextWithHighlights(pdf, FROM_ADDRESS.cityStateZip, fromCol, currentY, { fontSize: FONT_SIZE_MD });
        pdf.setFont('helvetica', 'normal');
        drawTextWithHighlights(pdf, order.shipping.address_1, shipToCol, currentY, { fontSize: FONT_SIZE_MD });
        currentY += 15;

        drawTextWithHighlights(pdf, FROM_ADDRESS.phone, fromCol, currentY, { fontSize: FONT_SIZE_MD });
        if (order.shipping.address_2) {
            drawTextWithHighlights(pdf, order.shipping.address_2, shipToCol, currentY, { fontSize: FONT_SIZE_MD });
            currentY += 15;
        }
        drawTextWithHighlights(pdf, `${order.shipping.city} ${order.shipping.state} ${order.shipping.postcode}`, shipToCol, currentY, { fontSize: FONT_SIZE_MD });
        currentY += 15;
        drawTextWithHighlights(pdf, `Email: ${order.billing.email}`, shipToCol, currentY, { fontSize: FONT_SIZE_MD });
        currentY += 15;
         if (order.shipping.phone) {
             drawTextWithHighlights(pdf, `Phone: ${order.shipping.phone}`, shipToCol, currentY, { fontSize: FONT_SIZE_MD });
             currentY += 15;
         }
    }

    currentY += 20;
    pdf.setDrawColor('#e5e7eb');
    pdf.line(MARGIN, currentY, MARGIN + DOC_WIDTH, currentY);
    currentY += 20;

    // Table Headers
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(FONT_SIZE_SM);
    pdf.setTextColor('#6b7280');

    const headers = ['IMAGE', 'SKU', 'QTY', 'MEDIA', 'PRODUCT'];
    let currentX = MARGIN;
    for (let i = 0; i < headers.length; i++) {
        pdf.text(headers[i], currentX, currentY);
        currentX += PDF_COL_SPANS[i] * unitWidth;
    }
};

const drawFooter = (pdf: any, currentPage: number, totalPages: number) => {
    const PAGE_HEIGHT = pdf.internal.pageSize.getHeight();
    const PAGE_WIDTH = pdf.internal.pageSize.getWidth();
    const footerY = PAGE_HEIGHT - MARGIN / 2;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(FONT_SIZE_MD);
    pdf.setTextColor('#6b7280');
    const text = `Page ${currentPage} of ${totalPages}`;
    pdf.text(text, PAGE_WIDTH / 2, footerY, { align: 'center' });
};


const drawLineItem = async (pdf: any, item: LineItem, y: number, skuToMaterialMap: Map<string, string>) => {
    const DOC_WIDTH = pdf.internal.pageSize.getWidth() - MARGIN * 2;
    pdf.setDrawColor('#e5e7eb');
    pdf.line(MARGIN, y - 10, MARGIN + DOC_WIDTH, y - 10);

    const totalUnits = PDF_COL_SPANS.reduce((a, b) => a + b, 0);
    const unitWidth = DOC_WIDTH / totalUnits;

    let currentX = MARGIN;

    // Image
    const imgX = currentX;
    const imgY = y;
    const imgWidth = 120;
    const imgHeight = 120;
    try {
        if (item.image && item.image.src) {
            const base64Image = await imageToBase64(item.image.src);
            const imageType = base64Image.split(';')[0].split('/')[1].toUpperCase();
            pdf.addImage(base64Image, imageType, imgX, imgY, imgWidth, imgHeight);
        }
    } catch (e) {
        console.error("Failed to add image to PDF", e);
    }
    currentX += PDF_COL_SPANS[0] * unitWidth;


    // SKU
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(FONT_SIZE_MD);
    pdf.setTextColor('#111827');
    pdf.text(item.sku, currentX, y + 65);
    currentX += PDF_COL_SPANS[1] * unitWidth;

    // QTY
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(FONT_SIZE_XL);
    pdf.text(String(item.quantity), currentX, y + 65, { align: 'center' });
    currentX += PDF_COL_SPANS[2] * unitWidth;

    // Media
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(FONT_SIZE_MD);
    const mediaText = skuToMaterialMap.get(item.sku) || 'N/A';
    const mediaColWidth = PDF_COL_SPANS[3] * unitWidth;
    const mediaLines = pdf.splitTextToSize(mediaText, mediaColWidth * 0.95); // 5% padding
    pdf.text(mediaLines, currentX, y + 65);
    currentX += PDF_COL_SPANS[3] * unitWidth;

    // Product
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(FONT_SIZE_SM);
    const productColWidth = PDF_COL_SPANS[4] * unitWidth;
    const productNameLines = pdf.splitTextToSize(item.name, productColWidth * 0.95);
    pdf.text(productNameLines, currentX, y + 20);

    let metaY = y + 20 + productNameLines.length * FONT_SIZE_SM * LINE_HEIGHT;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(FONT_SIZE_SM);
    item.meta_data.forEach(meta => {
        const displayValue = String(meta.display_value || meta.value).replace(/<[^>]+>/g, '');
        if (displayValue && meta.key !== '_wapf_meta') {
            const metaLines = pdf.splitTextToSize(`${meta.display_key}: ${displayValue}`, productColWidth * 0.95);
            drawTextWithHighlights(pdf, metaLines.join(' '), currentX, metaY, { fontSize: FONT_SIZE_SM });
            metaY += (FONT_SIZE_SM * LINE_HEIGHT) * metaLines.length;
        }
    });

};

const drawOrderOnPage = async (pdf: any, order: Order, skuToMaterialMap: Map<string, string>) => {
    const itemLayout = calculatePageLayout(pdf, order, skuToMaterialMap);
    const totalPages = itemLayout.length;

    for (let i = 0; i < totalPages; i++) {
        const pageItems = itemLayout[i];
        const isContinuation = i > 0;

        if (isContinuation) {
            pdf.addPage();
        }

        drawHeader(pdf, order, isContinuation);
        
        let currentY = isContinuation ? MARGIN + 80 : MARGIN + 170;

        for (const item of pageItems) {
            await drawLineItem(pdf, item, currentY, skuToMaterialMap);
            currentY += calculateItemHeight(pdf, item, skuToMaterialMap);
        }

        if (totalPages > 1) {
            drawFooter(pdf, i + 1, totalPages);
        }
    }
};

const App = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const slipRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});

    const skuToMaterialMap = new Map(skuMaterials.map(item => [item.SKU, item.Materials]));

    const handleImageStatusChange = (orderId: number, itemId: number, status: 'loading' | 'loaded' | 'error') => {
        const key = `${orderId}-${itemId}`;
        setImageLoadStatus(prev => ({ ...prev, [key]: status }));
    };

    const allImagesLoaded = orders.length > 0 && orders.every(order =>
        order.line_items.every(item => {
            const status = imageLoadStatus[`${order.id}-${item.id}`];
            return status === 'loaded' || status === 'error'; // Treat error as "done loading"
        })
    );

    const handleGenerate = () => {
        setError('');
        setOrders([]);
        setImageLoadStatus({});
        if (!jsonInput) {
            setError('Please paste JSON data.');
            return;
        }

        try {
            const data = JSON.parse(jsonInput);
            if (Array.isArray(data)) {
                setOrders(data);
                // Initialize image loading status
                const initialStatus: Record<string, 'loading' | 'loaded' | 'error'> = {};
                data.forEach(order => {
                    order.line_items.forEach((item: LineItem) => {
                        if (item.image && item.image.src) {
                            initialStatus[`${order.id}-${item.id}`] = 'loading';
                        } else {
                            initialStatus[`${order.id}-${item.id}`] = 'loaded'; // No image to load
                        }
                    });
                });
                setImageLoadStatus(initialStatus);

            } else {
                setError('JSON data must be an array of orders.');
            }
        } catch (e) {
            setError('Invalid JSON format.');
        }
    };
    const handleDownloadPdf = async (order: Order) => {
        setLoading(true);
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'pt', 'a4');
            await drawOrderOnPage(pdf, order, skuToMaterialMap);
            pdf.save(`packing-slip-${order.number}.pdf`);
        } catch (e) {
            console.error("Failed to generate PDF:", e);
            setError("Sorry, there was an error generating the PDF.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadAllPdfs = async () => {
        setLoading(true);
        setError('');

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'pt', 'a4');
            
            for(let i = 0; i < orders.length; i++) {
                const order = orders[i];
                await drawOrderOnPage(pdf, order, skuToMaterialMap);

                // Add a new page for the next order, unless it's the last one
                if (i < orders.length - 1) {
                    pdf.addPage();
                }
            }
            
            pdf.save('all-packing-slips.pdf');
        } catch (e) {
            console.error("Failed to generate all PDFs:", e);
            setError("Sorry, there was an error generating the combined PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 font-sans">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-center">
                        <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-lg text-gray-700">Generating PDF(s)... Please wait.</p>
                    </div>
                </div>
            )}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800">Packing Slip Generator</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Generate printable packing slips from WooCommerce order JSON data.
                </p>
            </header>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">WooCommerce JSON Data</h2>
                <textarea
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='[ { "id": 4791, "number": "CC-0136", ... } ]'
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                    onClick={handleGenerate}
                    className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Generate Packing Slips
                </button>
            </div>

            {orders.length > 0 && (
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Generated Slips</h2>
                        <button
                            onClick={handleDownloadAllPdfs}
                            disabled={!allImagesLoaded || loading}
                            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                        >
                            <DownloadIcon />
                            Download All Slips
                        </button>
                    </div>
                     {!allImagesLoaded && <p className="text-sm text-gray-500 mb-4">Please wait for all product images to load before downloading all slips.</p>}

                    <div className="space-y-12">
                        {orders.map((order, index) => (
                            <div
                                key={order.id}
                                ref={(el) => (slipRefs.current[index] = el)}
                                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
                            >
                                <div className="grid grid-cols-2 gap-8 items-start mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 col-span-1">Packing slip</h2>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-gray-800">Order No.: {order.number}</p>
                                        <p className="text-sm text-gray-500">Order Date: {formatDate(order.date_created)}</p>
                                        <button
                                            onClick={() => handleDownloadPdf(order)}
                                            disabled={loading}
                                            className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm flex items-center justify-center ml-auto disabled:bg-gray-400"
                                        >
                                            <DownloadIcon />
                                            Download PDF
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-6 border-t border-gray-200" />
                                <div className="grid grid-cols-12 gap-4 mb-6">
                                    <div className="col-span-7">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">From</p>
                                        <p className="font-bold text-gray-800">{FROM_ADDRESS.name}</p>
                                        <p className="text-gray-600">{highlightPhoneNumbers(FROM_ADDRESS.street)}</p>
                                        <p className="text-gray-600">{highlightPhoneNumbers(FROM_ADDRESS.cityStateZip)}</p>
                                        <p className="text-gray-600">{highlightPhoneNumbers(FROM_ADDRESS.phone)}</p>
                                    </div>
                                    <div className="col-span-5">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ship To</p>
                                        <p className="text-gray-800">{order.shipping.first_name} {order.shipping.last_name}</p>
                                        <p className="font-bold text-gray-800">{order.shipping.company}</p>
                                        <p className="text-gray-600">{highlightPhoneNumbers(order.shipping.address_1)}</p>
                                        {order.shipping.address_2 && <p className="text-gray-600">{highlightPhoneNumbers(order.shipping.address_2)}</p>}
                                        <p className="text-gray-600">{order.shipping.city} {order.shipping.state} {order.shipping.postcode}</p>
                                        <p className="text-gray-600">Email: {order.billing.email}</p>
                                        {order.shipping.phone && <p className="text-gray-600">Phone: {highlightPhoneNumbers(order.shipping.phone)}</p>}
                                    </div>
                                </div>

                                <div className="flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <div className="grid grid-cols-12 gap-x-4 border-b border-gray-200 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <div className="col-span-3">Image</div>
                                                <div className="col-span-1">SKU</div>
                                                <div className="col-span-1 text-center">Qty</div>
                                                <div className="col-span-2">Media</div>
                                                <div className="col-span-5">Product</div>
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                {order.line_items.map((item) => (
                                                    <div key={item.id} className="grid grid-cols-12 gap-x-4 items-start py-4 border-b border-gray-100 last:border-b-0">
                                                        <div className="col-span-3">
                                                            {item.image && item.image.src ? (
                                                                <img
                                                                    src={`https://corsproxy.io/?${encodeURIComponent(item.image.src)}`}
                                                                    alt={item.name}
                                                                    className="w-full h-auto object-contain rounded-md"
                                                                    onLoad={() => handleImageStatusChange(order.id, item.id, 'loaded')}
                                                                    onError={() => handleImageStatusChange(order.id, item.id, 'error')}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-32 rounded-md flex items-center justify-center text-xs text-gray-400">No Image</div>
                                                            )}
                                                        </div>
                                                        <div className="col-span-1 self-center">
                                                            <p className="text-sm text-gray-700">{item.sku}</p>
                                                        </div>
                                                        <div className="col-span-1 text-center self-center">
                                                            <p className="text-xs font-bold text-gray-900">{item.quantity}</p>
                                                        </div>
                                                        <div className="col-span-2 self-center">
                                                            <p className="text-sm text-gray-700">{skuToMaterialMap.get(item.sku) || 'N/A'}</p>
                                                        </div>
                                                        <div className="col-span-5 self-center">
                                                            <p className="text-base font-semibold text-gray-800">{item.name}</p>
                                                             {item.meta_data.map(meta => {
                                                                const displayValue = String(meta.display_value || meta.value).replace(/<[^>]+>/g, '');
                                                                if (displayValue && meta.key !== '_wapf_meta') {
                                                                    return (
                                                                        <p key={meta.id} className="text-xs text-gray-500 mt-1">
                                                                            {meta.display_key}: {highlightPhoneNumbers(displayValue)}
                                                                        </p>
                                                                    );
                                                                }
                                                                return null;
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
