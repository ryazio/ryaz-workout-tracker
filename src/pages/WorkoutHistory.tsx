import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { get } from '../data/ionicStorage';
import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';


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
      {historyData.length && historyData.map((workout: any) => {
        const { workoutId, createdAt, data } = workout;
        return (
        <IonAccordionGroup key={workout.id}>
          <IonAccordion value="first" >
            <IonItem slot="header" color="light">
              <IonLabel>{workoutId} - {workout.createdAt.toString()}</IonLabel>
            </IonItem>
            <IonCard slot="content">
              <IonCardHeader>
                <IonCardTitle>{workoutId}</IonCardTitle>
                <IonCardSubtitle>{createdAt.toString()}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {Object.keys(data).map((sessionExercise: string) => (
                    <IonGrid key={sessionExercise}>
                      <IonListHeader>{sessionExercise}</IonListHeader>
                      <IonRow>
                        <IonCol>Set</IonCol>
                        <IonCol>Weight</IonCol>
                        <IonCol>Reps</IonCol>
                      </IonRow>
                      {data[sessionExercise].map((ex:any) =>(
                        <IonRow key={ex.set}>
                          <IonCol>{ex.set}</IonCol>
                          <IonCol>{ex.weight}</IonCol>
                          <IonCol>{ex.reps}</IonCol>
                        </IonRow>
                      ))}
                    </IonGrid>
                  ))}
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonAccordion>
        </IonAccordionGroup>
      )})}
    </IonContent>
  );
};

WorkoutHistory.propTypes = {

};

export default WorkoutHistory;