
export function Experience() {
    return (
        <section className="text-left mt-10">
            <details>
                <summary className="experience-title pb-4 cursor-pointer select-none">
                    <span className="arrow">▸</span>

                    <div className="summary-content space-y-1">
                        <div className="summary-row flex justify-between items-baseline">
                        <span className="job-title font-semibold">WordPress Developer</span>
                        <span className="date text-sm opacity-70">Sep 2019 – Dec 2025</span>
                        </div>

                        <div className="summary-row flex justify-between items-baseline">
                        <span className="job-title font-semibold">WordPress Developer (Junior)</span>
                        <span className="date text-sm opacity-70">May 2019 – Aug 2019</span>
                        </div>

                        <div className="company text-sm italic opacity-80 mt-1">
                        Y5 Creative – Vancouver, BC
                        </div>
                    </div>
                </summary>
                <div className="experience-details pb-4">
                    <ul className="list-disc pl-11">
                        <li>Built and maintained 24+ custom WordPress & WooCommerce sites from scratch</li>
                        <li>Converted Figma/XD designs into pixel-perfect, responsive layouts (Elementor/WPBakery + custom CSS)</li>
                        <li>Integrated Stripe, Moneris, PayPal, and Converge with recurring payments</li>
                        <li>Managed hosting, DNS, SSL, and full-site migrations (Cloudways, Flywheel, etc.)</li>
                        <li>Ongoing maintenance and security for 10+ retainer clients (near zero incidents in 6+ years)</li>
                    </ul>
                </div>
            </details>

            <details>
                <summary className="experience-title pb-4 cursor-pointer select-none">
                    <span className="arrow">▸</span>
                    <div>
                        <div className="summary-content space-y-1">
                            <div className="summary-row flex justify-between items-baseline">
                            <span className="job-title font-semibold">Freelance WordPress Developer</span>
                            <span className="date text-sm opacity-70">Sep 2018 – Present</span>
                            </div>
                        </div>

                        <div className="company text-sm italic opacity-80 mt-1">
                        Vancouver Ballet Society – Vancouver, BC
                        </div>
                    </div>
                </summary>
                <div className="experience-details pb-4">
                    <ul className="list-disc pl-11">
                        <li>Single-handedly rebuilt entire site from scratch using provided designs</li>
                        <li>Created custom templates and components with minimal plugins for speed</li>
                        <li>Set up hosting, security, and trained staff on updates</li>
                        <li>Custom sections with creative workarounds (without adding plugins)</li>
                    </ul>
                </div>
            </details>

            <details>
                <summary className="experience-title pb-4 cursor-pointer select-none">
                    <span className="arrow">▸</span>
                    <div>
                        <div className="summary-content space-y-1">
                            <div className="summary-row flex justify-between items-baseline">
                            <span className="job-title font-semibold">Web Developer Intern</span>
                            <span className="date text-sm opacity-70">Mar 2018 – May 2018</span>
                            </div>
                        </div>

                        <div className="company text-sm italic opacity-80 mt-1">
                            Cartfunnel (Remote)  – Canada
                        </div>
                    </div>
                </summary>
                <div className="experience-details pb-4">
                    <ul className="list-disc pl-11">
                        <li>Prototyped landing pages with Bootstrap and built basic Rails apps</li>
                        <li>First exposure to DigitalOcean servers and Git workflows</li>
                    </ul>
                </div>
            </details>            

        </section>
    )
}