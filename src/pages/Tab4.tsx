import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import WorkoutHistory from './WorkoutHistory';

interface TabProps {
};

const Tab4: React.FC<TabProps> = (props: TabProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <WorkoutHistory />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
