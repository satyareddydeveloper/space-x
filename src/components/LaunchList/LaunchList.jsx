import React from 'react';
import { Launch } from '../Launch/Launch';
import './styles.css';
import axios from 'axios';

export class LaunchList extends React.Component {

  state = {
    launches: []
  }

  componentDidMount = () => {
    this.getLaunches()
  }

  getLaunches = () => {
    axios.get('https://api.spacexdata.com/v3/launches').then((response) => {
      this.setState(
        { launches: response.data }
      )
    }).catch((error) => {
      console.log(error)
    })
  }

  launchList = () => {
    const launchListComponents = this.state.launches.map((launch,index) => {
      const image = launch.links.flickr_images.length === 0 ?
        'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg' : launch.links.flickr_images[0];
      return <Launch
        key={"launch_"+index}
        banner={image}
        title={launch.mission_name}
        launchDate={launch.launch_date_local}
        description={launch.details} />
    })

    return launchListComponents;
  }

  render() {
    return (
      <div className="launch-list">
          {this.launchList()}
      </div>
    )
  }
}