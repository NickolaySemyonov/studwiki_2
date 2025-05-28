export const Footer = () =>{
    return (
    <>
        {/* Sticky Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-auto">
            <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} StudWiki 2.0.</p>
            </div>
        </footer>
    </>
    )
};
