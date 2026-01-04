import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Skills() {
    return (
        <section>

            <div className="tech-section mt-[35px] font-bold">
                Technical Skills
            </div>
           
                <div className="skills-wrapper grid grid-cols-2 grid-cols-[150px_1fr]">
                    <nav className="skill-categories flex flex-col items-end pr-[20]">
                        <button className="skill-category font-bold w-fit" data-cat="wordpress">Wordpress</button>
                        <button className="skill-category font-bold w-fit" data-cat="payments">Payments</button>
                        <button className="skill-category font-bold w-fit" data-cat="frontend">Frontend</button>
                        <button className="skill-category font-bold w-fit" data-cat="performance">Performance</button>
                        <button className="skill-category font-bold w-fit" data-cat="hosting">Hosting</button>
                        <button className="skill-category font-bold w-fit" data-cat="design">Design</button>
                    </nav>

                    <div className="skills max-w-83">
                        <span data-cat="wordpress">WooCommerce </span>
                        <span data-cat="wordpress">Elementor </span>
                        <span data-cat="wordpress">WPBakery </span>
                        <span data-cat="wordpress">ACF Pro </span>
                        <span data-cat="wordpress">Custom
                    Plugin/Theme </span>

                        <span data-cat="payments">Stripe </span>
                        <span data-cat="payments">Moneris </span>
                        <span data-cat="payments">Converge </span>
                        <span data-cat="payments">PayPal </span>
                        <span data-cat="payments">REST API </span>
                        <span data-cat="payments">Webhooks </span>

                        <span data-cat="frontend">HTML5 </span>
                        <span data-cat="frontend">CSS3 </span>
                        <span data-cat="frontend">JavaScript </span>
                        <span data-cat="frontend">PHP </span>
                        <span data-cat="frontend">jQuery </span>

                        <span data-cat="performance">PageSpeed </span>
                        <span data-cat="performance">Yoast </span>
                        <span data-cat="performance">GTM </span>
                        <span data-cat="performance">Google Analytics </span>

                        <span data-cat="hosting">Cloudways </span>
                        <span data-cat="hosting">Flywheel </span>
                        <span data-cat="hosting">Git </span>
                        <span data-cat="hosting">DNS </span>

                        <span data-cat="design">Figma </span>
                        <span data-cat="design">XD </span>
                        <span data-cat="design">Photoshop </span>
                        <span data-cat="design">Illustrator</span>
                    </div>
                </div>
          




            

        
        </section>


    )
}