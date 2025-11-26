import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LANDING_PAGE } from "@/config/ui-text";

const LandingPage = () => {
  return (
    <>
      <header className="px-6 -mt-4 md:-mt-6 lg:-mt-8">
        <Image
          src="/desker-logo.png"
          width={LANDING_PAGE.LOGO_SIZE}
          height={LANDING_PAGE.LOGO_SIZE}
          alt="Desker Logo"
          priority
        />
      </header>
      <main>
        <div className="flex justify-center items-center -mt-2 md:-mt-5 lg:-mt-4">
          <h1 className="block font-bold text-4xl text-center">
            {LANDING_PAGE.TITLE_LINE1}
            <br />
            {LANDING_PAGE.TITLE_LINE2}
          </h1>
        </div>
        <div className="pb-10" />
        <div className="flex justify-center items-center gap-8 md:gap-12 pb-12 mt-3">
          <Button
            asChild
            className="
              bg-white
              text-blue-800
              border border-blue-600
              hover:bg-blue-600
              hover:text-white
              text-xl md:text-xl
              px-10 md:px-14
              py-5 md:py-6
              rounded-xl
              transition-colors
            "
          >
            <Link href="/login">{LANDING_PAGE.LOGIN_BUTTUN}</Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="
              bg-white
              text-blue-800
              border border-blue-600
              hover:bg-blue-600
              hover:text-white
              text-xl md:text-xl
              px-10 md:px-14
              py-5 md:py-6
              rounded-xl
              transition-colors
            "
          >
            <Link href="/signup">{LANDING_PAGE.FREE_BUTTUN}</Link>
          </Button>
        </div>
        <section className="flex justify-center items-center rounded-lg bg-blue-200 p-1 mt-1">
          <Image
            src="/information-section-image.png"
            width={LANDING_PAGE.IMAGE_SIZE_WIDTH}
            height={LANDING_PAGE.IMAGE_SIZE_HEIGHT}
            alt="Landing Information Section Image"
            priority
          />
        </section>
      </main>
    </>
  );
};

export default LandingPage;
