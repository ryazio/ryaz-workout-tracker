import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { get } from '../data/ionicStorage';
import { IonAccordion, IonAccordionGroup, IonContent, IonItem, IonLabel } from '@ionic/react';


interface WorkoutHistoryProps {}

const WorkoutHistory = (props: WorkoutHistoryProps) => {
  const [historyData, setHistoryData] = useState([]);
  const loadData = async() => {
    setHistoryData(await get('history') || []);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <IonContent className="ion-padding">
      {historyData.length && historyData.map((workout: any) => (
        <IonAccordionGroup key={workout.id}>
          <IonAccordion value="first" >
            <IonItem slot="header" color="light">
              <IonLabel>{workout.createdAt.toString()}</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {JSON.stringify(workout.data)}
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      ))}
    </IonContent>
  );
};

WorkoutHistory.propTypes = {

};

export default WorkoutHistory;