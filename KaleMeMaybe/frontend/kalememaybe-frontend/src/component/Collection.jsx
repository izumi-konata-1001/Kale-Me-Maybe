/* eslint-disable react/prop-types */
// Or maybe use PropTypes later

// Collection component

export default function Collection({ path, collectionName, file, count}) {
    return(
        <a href={ path } className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    src={ file }
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{ collectionName }</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">Recipe · { count }</p>
        </a>
    )
}