import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import CreateWorkout from '../components/CreateWorkout';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Add Workout page" /> */}
        <CreateWorkout/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
