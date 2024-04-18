export default function page({ params }: any) {
    return (
        <div className="flex flex-col justify-center items-center py-2 min-h-screen">
            <h1>Profile Page</h1>
            <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
        </div>
    );
}
