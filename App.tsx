import React, { useState, useRef, useEffect } from 'react';
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

const PLACEHOLDER_SVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgc3R5bGU9ImZpbGw6ICNmMmYzZjU7IiAvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlsbHk9InNhbnMtc2VyaWYiIGZvbnQtc2lçZPSIxMHB4IiBmaWxsPSIjY2FkMWQ4Ij5JbWFnZSBFcnJvcjwvdGV4dD4KPC9zdmc+Cg==`;

interface PackingSlipProps {
    order: Order;
    skuToMaterialMap: Map<string, string>;
}

const PackingSlip: React.FC<PackingSlipProps> = ({ order, skuToMaterialMap }) => {
    const slipRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const totalImages = order.line_items.filter(item => item.image?.src).length;
    const loadedImagesCount = useRef(0);
    const [imagesLoading, setImagesLoading] = useState(totalImages > 0);

    useEffect(() => {
        loadedImagesCount.current = 0;
        setImagesLoading(totalImages > 0);
    }, [order.id, totalImages]);

    const handleImageLoadOrError = () => {
        loadedImagesCount.current++;
        if (loadedImagesCount.current >= totalImages) {
            // Use a small timeout to allow the browser to paint the last image before capture
            setTimeout(() => setImagesLoading(false), 200);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    const handleDownloadPdf = async () => {
        if (!slipRef.current || imagesLoading) return;
        setIsGenerating(true);
        
        const { jsPDF } = window.jspdf;
        const canvas = await window.html2canvas(slipRef.current, {
            scale: 2, // Higher scale for better resolution
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let imgWidth = pdfWidth - 20; // with some margin
        let imgHeight = imgWidth / ratio;
        
        if (imgHeight > pdfHeight - 20) {
            imgHeight = pdfHeight - 20;
            imgWidth = imgHeight * ratio;
        }

        const x = (pdfWidth - imgWidth) / 2;
        const y = 10;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`PackingSlip_${order.number}.pdf`);
        setIsGenerating(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 break-inside-avoid mb-8 relative">
            <div ref={slipRef} className="p-4">
                <header className="flex justify-between items-start pb-4 border-b">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Packing slip</h1>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-800">Order No.: {order.number}</h2>
                        <p className="text-sm text-gray-600">Order Date: {formatDate(order.date_created)}</p>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
                    <div className="md:col-span-8">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">From</h3>
                        <p className="font-bold text-gray-700">{FROM_ADDRESS.name}</p>
                        <p className="text-gray-600">{FROM_ADDRESS.street}</p>
                        <p className="text-gray-600">{FROM_ADDRESS.cityStateZip}</p>
                        <p className="text-gray-600">{FROM_ADDRESS.phone}</p>
                    </div>
                    <div className="md:col-span-4 md:col-start-9">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ship to</h3>
                        <p className="font-bold text-gray-700">{order.shipping.first_name} {order.shipping.last_name}</p>
                        <p className="text-gray-600">{order.shipping.company}</p>
                        <p className="text-gray-600">{order.shipping.address_1}</p>
                        <p className="text-gray-600">{order.shipping.city} {order.shipping.postcode}</p>
                        <p className="text-gray-600">Email: {order.billing.email}</p>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b pb-2">
                        <div className="col-span-3">Image</div>
                        <div className="col-span-1">SKU</div>
                        <div className="col-span-1 text-center">QTY</div>
                        <div className="col-span-3">Media</div>
                        <div className="col-span-4">Product</div>
                    </div>
                    <div className="space-y-4">
                        {order.line_items.map((item: LineItem) => {
                             const originalImageUrl = item.image?.src;
                             const imageUrl = originalImageUrl ? `https://corsproxy.io/?${encodeURIComponent(originalImageUrl)}` : PLACEHOLDER_SVG;
                             const material = skuToMaterialMap.get(item.sku) || '';

                            return (
                                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center border-b py-4">
                                    <div className="sm:col-span-3">
                                         <img 
                                            src={imageUrl} 
                                            alt={item.name} 
                                            crossOrigin="anonymous"
                                            onLoad={handleImageLoadOrError}
                                            onError={(e) => {
                                                console.error(`Error loading image ${originalImageUrl}`);
                                                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_SVG;
                                                handleImageLoadOrError();
                                            }}
                                            className="w-full h-auto max-w-xs object-contain rounded-md bg-gray-100 p-1" />
                                    </div>
                                    <div className="sm:col-span-1 text-gray-700 font-mono text-sm">{item.sku}</div>
                                    <div className="sm:col-span-1 text-gray-800 font-bold text-lg text-center">{item.quantity}</div>
                                    <div className="sm:col-span-3 text-gray-600 text-xs">{material}</div>
                                    <div className="sm:col-span-4">
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <div className="text-xs text-gray-600 mt-1 space-y-1">
                                            {item.meta_data.filter(meta => meta.display_key && !meta.key.startsWith('_')).map(meta => (
                                                <div key={meta.id}>
                                                    <span className="font-semibold">{meta.display_key}: </span>
                                                    <span>{meta.display_value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
            <button
                onClick={handleDownloadPdf}
                disabled={isGenerating || imagesLoading}
                className="absolute top-4 right-4 mt-12 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <DownloadIcon />
                {isGenerating ? 'Generating...' : (imagesLoading ? 'Loading Images...' : 'Download PDF')}
            </button>
        </div>
    );
};

export default function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);

    const skuToMaterialMap = React.useMemo(() => 
        new Map(skuMaterials.flatMap(item => 
            item.SKU.split(' or ').map(sku => [sku.trim(), item.Materials])
        ))
    , []);

    const handleParseJson = () => {
        if (!jsonInput.trim()) {
            setError("Please paste your JSON data into the text area.");
            setOrders([]);
            return;
        }
        try {
            const data = JSON.parse(jsonInput);
            if (Array.isArray(data)) {
                setOrders(data);
                setError(null);
            } else {
                setError("Invalid JSON format. Please provide an array of orders.");
                setOrders([]);
            }
        } catch (e) {
            setError("Invalid JSON. Please check the data and try again.");
            setOrders([]);
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-900">
            <main className="container mx-auto p-4 sm:p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">Packing Slip Generator</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Paste your WooCommerce order JSON below to generate printable packing slips.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
                            WooCommerce JSON Data
                        </label>
                        <textarea
                            id="json-input"
                            rows={12}
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition font-mono text-sm"
                            placeholder="Paste your JSON array here..."
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        />
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleParseJson}
                                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                            >
                                Generate Packing Slips
                            </button>
                        </div>
                    </div>
                </div>

                {orders.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Generated Slips</h2>
                        <div className="max-w-5xl mx-auto space-y-8">
                            {orders.map((order) => (
                                <PackingSlip key={order.id} order={order} skuToMaterialMap={skuToMaterialMap} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
