import screen_size from "../../assets/general/screen_size.svg";

function ScreenSizeAlert() {
  return (
    <main className="flex justify-start items-center pt-20 errBg bg-center z-20 absolute w-full h-[300%] flex-col text-gray-800 gap-4 bg-[#86c2b9]">
      <img src={screen_size} alt="screen_size" width={400} height={400} />
      <div className="flex justify-center items-center flex-col gap-2">
        <h1 className="ar-txt text-5xl mb-2">أووه...لا!</h1>
        <p className="ar-txt text-2xl">{`من فضلك استخدم شاشة بعرض 800 بكسل أو أعلى،`}</p>
        <p className="text-2xl">{`.وذلك لتوفير تجربة ملائمة عند استخدام النظام`}</p>
      </div>
    </main>
  );
}

export default ScreenSizeAlert;
