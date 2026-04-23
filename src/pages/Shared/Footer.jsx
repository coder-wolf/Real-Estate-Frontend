import React from 'react';

const Footer = () => {
    return (
        <div className=''>
            <footer className="footer lg:px-36 md:px-16 py-16 bg-[#F7F7FC] text-base-content p-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Property Listing</a>
                    <a className="link link-hover">Legal Services</a>
                    <a className="link link-hover">Title Insurance</a>
                    <a className="link link-hover">Moving Services</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form onSubmit={() => {

                }} className='mx-auto col-span-2 '>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control md:w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item w-44" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        </div>
    );
};

export default Footer;