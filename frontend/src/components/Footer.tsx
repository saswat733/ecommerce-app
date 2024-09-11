export default function FooterComponent(){
    return (
        <>
        <FooterTemplate/>
        </>
    )
}


function FooterTemplate(){
    return (
        <>
        <div className="flex text-[8px] md:text-xs py-5 md:py-10 border-2 justify-between px-2 text-gray-700">
            <div className="">
                <p>@ ShoppersStop. 2024. All Rights Reserved.</p>
            </div>
            <div className="">
                <p>Privacy Policy Terms & Conditions Disclaimer</p>
            </div>
        </div>
        </>
    )
}