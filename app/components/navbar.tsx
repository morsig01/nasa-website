export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-3xl font-bold">Nasa</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className=" border border-gray-400 px-4 py-2 rounded hover:bg-gray-700">Home</a></li>
                    <li><a href="#" className=" border border-gray-400 px-4 py-2 rounded hover:bg-gray-700">About</a></li>
                    <li><a href="#" className=" border border-gray-400 px-4 py-2 rounded hover:bg-gray-700">Content</a></li>
                    <li><a href="#" className=" border border-gray-400 px-4 py-2 rounded hover:bg-gray-700">Contact</a></li>
                </ul>
            </nav>
        </div>
    )
}