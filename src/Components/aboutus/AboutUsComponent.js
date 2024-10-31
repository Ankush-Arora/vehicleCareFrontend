import React from 'react'
import './AboutUsStyles.css'
import TeamCardComponent from '../teamcard/TeamCardComponent'
import MetaData from '../navbar/MetaData'
const AboutUsComponent = () => {

  const teamMember = [
    { id: 4, name: 'Ankush Arora', image: 'images/ankushImage1.jpeg', description: 'Full Stack Developer proficient in both the front-end & back-end technologies.' }
  ]

  return (
    <><div className='component-heading'><h1>About Us</h1></div>
    <div className='aboutus-container'>
    <MetaData title="About Page"/>
      <div className='about-data'>

      <div className='about-fifth'>
          <span className='about-span-heading'>Developer</span>
          <div>
            {
              teamMember.map((eachMember, idx) => <TeamCardComponent key={idx} memberProp={eachMember} />)
            }
          </div>
        </div>

        <div className='about-first'>
          <span className='about-span-heading'>Who we are</span>
          <div><p>Vehicle Care is a technology platform offering a variety of vechile washing at youy home. Customers use our platform to book washing services such as
            vehicle water wash,foam wash,snow foam wash,polish after washing etc. These services are
            delivered in the comfort of their home and at a time of their choosing. We promise our customers a high quality, standardised and
            reliable service experience. To fulfill this promise, we work closely with our hand-picked service partners, enabling them with
            technology, training, tools, financing, insurance and name, helping them succeed and deliver on this promise.</p>
            <p><b>Our Vision:</b>Empower millions of professionals worldwide to deliver washing services at home like never experienced before</p>
          </div>
        </div>

        <div className='about-second'>
          <div id='about-second-data'><span className='about-span-numbers'>20+</span><span>Trained Professional</span></div>
          <div><span className='about-span-numbers'>100+</span><span>Happy Customers</span></div>
          <div><span className='about-span-numbers'>1</span><span>Cities</span></div>
          <div><span className='about-span-numbers'>1</span><span>Countries</span></div>
        </div>
        <div className='about-third'>
          <span className='about-span-heading'>How we do it</span>
          <p>Vehicle Care provides a platform that allows skilled and experienced professionals to connect with users looking for specific
            services. Once on the platform, our match-making algorithm identifies professionals who are closest to the users' requirements and
            available at the requested time and date.</p>
        </div>
       
      </div>
    </div></>
  )
}

export default AboutUsComponent
