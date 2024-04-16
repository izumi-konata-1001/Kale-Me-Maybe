// import Collection from "./component/Collection";

export default function Favorites() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 className="text-5xl font-bold">Favorites</h2>
                </div>
                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <a href="#" style={{ display: 'inline-block' }}>
                            <svg viewBox="0 0 24 24" width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#97C279"></path> </g></svg>
                        </a>
                        <label style={{ color: "GrayText", marginLeft: '15px'}}>Add a new board...</label>
                    </div>
                    <svg fill="#97C279" viewBox="0 0 56 56"  width="50" height="50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 16.5390 25.3984 C 16.5390 20.4531 20.5936 16.3984 25.5624 16.3984 C 30.5077 16.3984 34.5624 20.4531 34.5624 25.3984 C 34.5624 27.3437 33.9530 29.1250 32.8983 30.5781 L 38.7577 36.4375 C 39.0858 36.7656 39.2968 37.2109 39.2968 37.6563 C 39.2968 38.6406 38.6171 39.3203 37.7030 39.3203 C 37.1640 39.3203 36.7187 39.1563 36.2733 38.7109 L 30.4843 32.9219 C 29.0780 33.8594 27.3671 34.4219 25.5624 34.4219 C 20.5936 34.4219 16.5390 30.3672 16.5390 25.3984 Z M 19.1405 25.3984 C 19.1405 28.9141 22.0468 31.8203 25.5624 31.8203 C 29.0312 31.8203 31.9374 28.9141 31.9374 25.3984 C 31.9374 21.9297 29.0312 19.0234 25.5624 19.0234 C 22.0468 19.0234 19.1405 21.9297 19.1405 25.3984 Z"></path></g></svg>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {/* collection list */}
            </div>
        </div>
    );
}

