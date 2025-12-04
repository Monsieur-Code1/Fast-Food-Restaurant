
import style from './CustomerPage.module.css';
import Footer from './Footer';
import SimpleSlider from './SliderPage';
import styleT from './TitlePage.module.css';

export default function CustomerPage() {
  return (
    <section className={style.Container}>
      <div className={styleT.containerTitle}>
        <h3 className={styleT.titlePage}>What Says Our Customers?</h3>
        <img
          className={styleT.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>

      <SimpleSlider />
      <ContainerPhoto/>
      <img className={style.vector8} src="/images/Vector 8 (1).png" alt="" />
      <Footer/>
    </section>
  );
}

function ContainerPhoto(){
 
  

  return (
    <div  className="mt-0 flex w-full flex-row-reverse sm:flex-row flex-wrap justify-around ">
      <img
        src="/images/pizza-black.jpg"
        className="w-[99%] items-start sm:w-[65%] md:w-[500px] lg:w-[600px]"
        alt=""
      />
      <p className="cursor-pointer pt-5 font-Inter text-[20px] text-[#ffffff]">
        Add Your Feedback
      </p>
    </div>
  );
}
