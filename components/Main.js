import React from 'react'

function Main() {
    return (
        <div className="h-screen flex flex-col">
            <header className="flex h-10 bg-gray-200">Header</header>
            <div className="flex flex-1 bg-gray-100 overflow-auto">Long Content</div>
            <footer className="flex h-10 bg-gray-200">Footer</footer>
        </div>

    )
}

export default Main