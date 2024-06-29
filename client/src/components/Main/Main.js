import React, { useEffect, useState } from 'react'

import NigeriaTab from './Tabs/NigeriaTab';
import UsaTab from './Tabs/UsaTab';
import UkTab from './Tabs/UkTab';
import AllSongsTab from './Tabs/AllSongsTab';
import SouthAfricaTab from './Tabs/SouthAfricaTab';
import Top50Tab from './Tabs/Top50Tab';
import { getAllTracks, getCountryTopTracks, getTop50Tracks } from '../../actions/track';

import './main.css';

const countries = {
  nigeria: 'NG', 
  south_africa: 'ZA', 
  united_states: 'US', 
  united_kingdom: 'GB'
};

const Main = () => {
  const [new50TopTracks, setNew50TopTracks] = useState();
  const [nigeriaTopTracks, setNigeriaTopTracks] = useState();
  const [southAfrTopTracks, setSouthAfrTopTracks] = useState();
  const [usaTopTracks, setUsaTopTracks] = useState();
  const [ukTopTracks, setUkTopTracks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [allTracks, setAllTracks] = useState();

  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      const allTracks = await getAllTracks();
      const new50TopTracks = await getTop50Tracks();
      const nigeriaTopTracks = await getCountryTopTracks(countries.nigeria);
      const southAfrTopTracks = await getCountryTopTracks(countries.south_africa);
      const usaTopTracks = await getCountryTopTracks(countries.united_states);
      const ukTopTracks = await getCountryTopTracks(countries.united_kingdom);

      setAllTracks(allTracks.data);
      setNew50TopTracks(new50TopTracks.data);
      setNigeriaTopTracks(nigeriaTopTracks.data);
      setSouthAfrTopTracks(southAfrTopTracks.data);
      setUsaTopTracks(usaTopTracks.data);
      setUkTopTracks(ukTopTracks.data);

      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(true)
    }
  }


  useEffect(() => {
    fetchAllData();
  }, [])
  

  const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  if (isLoading) {
    return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>     
      );
  }

  return (
    <main>
        <section className="tabs d-flex align-items-center sticky-top gap-3 mt-3">
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

        <section className='pt-3'>
            <section id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
              <AllSongsTab allTracks={allTracks} />
            </section>

            <section id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
              <NigeriaTab nigeriaTopTracks={nigeriaTopTracks} />
            </section>

            <section id="tab3" className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
              <SouthAfricaTab southAfrTopTracks={southAfrTopTracks} />
            </section>

            <section id="tab4" className={`tab-content ${activeTab === 'tab4' ? 'active' : ''}`}>
              <UsaTab usaTopTracks={usaTopTracks} />
            </section>

            <section id="tab5" className={`tab-content ${activeTab === 'tab5' ? 'active' : ''}`}>
              <UkTab ukTopTracks={ukTopTracks} />
            </section>

            <section id="tab6" className={`tab-content ${activeTab === 'tab6' ? 'active' : ''}`}>
              <Top50Tab new50TopTracks={new50TopTracks} />
            </section>
        </section>
    </main>
  )
}

export default Main