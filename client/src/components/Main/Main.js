import React, { useState } from 'react'

import NigeriaTab from './Tabs/NigeriaTab';
import UsaTab from './Tabs/UsaTab';
import UkTab from './Tabs/UkTab';
import AllSongsTab from './Tabs/AllSongsTab';
import SouthAfricaTab from './Tabs/SouthAfricaTab';
import Top50Tab from './Tabs/Top50Tab';

import './main.css';

const Main = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  
  return (
    <main>
        <section className="tabs">
          <div className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')}>
            All
          </div>
          <div className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')}>
            Nigeria
          </div>
          <div className={`tab ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')}>
            South Africa
          </div>
          <div className={`tab ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => handleTabClick('tab4')}>
            USA
          </div>
          <div className={`tab ${activeTab === 'tab5' ? 'active' : ''}`} onClick={() => handleTabClick('tab5')}>
            UK
          </div>
          <div className={`tab ${activeTab === 'tab6' ? 'active' : ''}`} onClick={() => handleTabClick('tab6')}>
            New Top 50
          </div>
        </section>

        <section className='d-flex gap-2'>
            <section id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
            <AllSongsTab />
            </section>

            <section id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
            <NigeriaTab />
            </section>

            <section id="tab3" className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
            <SouthAfricaTab />
            </section>

            <section id="tab4" className={`tab-content ${activeTab === 'tab4' ? 'active' : ''}`}>
            <UsaTab />
            </section>

            <section id="tab5" className={`tab-content ${activeTab === 'tab5' ? 'active' : ''}`}>
            <UkTab />
            </section>

            <section id="tab6" className={`tab-content ${activeTab === 'tab6' ? 'active' : ''}`}>
            <Top50Tab />
            </section>
        </section>
    </main>
  )
}

export default Main