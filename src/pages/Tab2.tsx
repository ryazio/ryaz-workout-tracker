import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CreateExercise from '../components/CreateExercise';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Exercise</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Exercise</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 2 page" /> */}
        <CreateExercise />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
