function RememberMe({color,current,setCookieData,setCurrent,remember,signinDetails}) {
    return (<>
        <div className="flex items-center h-5">
            <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                data-testid="remember-me"
                className="bg-gray-50 
                   border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4
                    rounded"
                onClick={() => { setCookieData(!current,signinDetails); setCurrent(!current) }}
            />
        </div>
        <div className="text-sm ml-3">
            <label
                className={`${color?.text} text-sm font-semibold `}
            >
                {remember}
            </label>
        </div>
    </>

    )
}

export default RememberMe