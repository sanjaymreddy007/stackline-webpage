import React from 'react';

interface ProductDetailsProps {
    title: string;
    subtitle: string;
    image: string;
    tags: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ title, subtitle, image, tags }) => {
    return (
        <div className="p-0">
            <img src={image} alt={title} className="h-32 w-32 mx-auto rounded-md" />
            <h2 className="text-lg font-bold mt-4 text-center">{title}</h2>
            <p className="text-sm text-gray-400 text-center mt-2">{subtitle}</p>

            {/* Line above the tags section */}
            <div className="border-t border-gray-300 mt-4 w-full"></div>

            <div className="flex flex-wrap justify-center mt-4 gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-transparent border border-gray-300 text-gray-600 rounded-md text-xs"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="border-b border-gray-300 mt-4 w-full"></div>
        </div>
    );
};

export default ProductDetails;
