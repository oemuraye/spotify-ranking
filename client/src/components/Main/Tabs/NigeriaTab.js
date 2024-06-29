import React from 'react'

const NigeriaTab = ({nigeriaTopTracks}) => {
  return (
    <section>
      <ul className='row'>
      {nigeriaTopTracks && nigeriaTopTracks.tracks.items.map((track) => (
          <li className='col-md-4 col-sm-6 my-2' key={track.track.id}>
            <a href={track.track.external_urls.spotify} target='_blank' title='play song' className="d-flex gap-2" rel="noreferrer">
              <img src={track.track.album.images[0].url} alt="track-img" height="100px" width='100px' className='rounded-3' />
              <div>
                <h6 className='mb-0'>{track.track.name}</h6>
                <p>{track.track.album.artists[0].name}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NigeriaTab