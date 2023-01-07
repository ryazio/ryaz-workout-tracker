import { IonButton, IonContent, IonHeader, IonLabel, IonNavLink, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import RecordWorkout from '../components/RecordWorkout';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record Workout</IonTitle>
          {/* <IonLabel> */}
          {/* <a href="/history">

</a> */}
          <IonRouterLink href='/history'>
            History
          </IonRouterLink>
          {/* </IonLabel> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 3 page" /> */}
        <RecordWorkout />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
