import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { get } from '../data/ionicStorage';
import {
  IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader,
  IonRefresher, IonRefresherContent, IonRow, RefresherEventDetail 
} from '@ionic/react';


interface WorkoutHistoryProps {}

const WorkoutHistory = (props: WorkoutHistoryProps) => {
  const [workoutData, setWorkoutData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const loadData = async() => {
    setWorkoutData(await get('workouts') || []);
    setExerciseData(await get('exercises') || []);
    setHistoryData(await get('history') || []);
  }

  const getWorkoutNameById = (id: string) => {
    const workoutObj = workoutData.find((workout: any) => workout.id === id) || { name: ''};
    return workoutObj.name || "[Deleted Workout]";
  };

  const getExerciseNameById = (id: string) => {
    const exerciseObj = exerciseData.find((exercise: any) => exercise.id == id) || { name: ''};
    return exerciseObj.name; 
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      loadData();
      event.detail.complete();
    }, 2000);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <IonContent className="ion-padding">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      {!!historyData.length && historyData.map((workout: any) => {
        const { workoutId, createdAt, data } = workout;
        const workoutName = getWorkoutNameById(workoutId);
        return (
        <IonAccordionGroup key={workout.id}>
          <IonAccordion value="first" >
            <IonItem slot="header" color="light">
              <IonLabel>{workoutName} - {workout.createdAt.toString()}</IonLabel>
            </IonItem>
            <IonCard slot="content">
              <IonCardHeader>
                <IonCardTitle>{workoutName}</IonCardTitle>
                <IonCardSubtitle>{createdAt.toString()}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {Object.keys(data).map((sessionExercise: string) => (
                    <IonGrid key={sessionExercise}>
                      <IonListHeader>{getExerciseNameById(sessionExercise)}</IonListHeader>
                      <IonRow>
                        <IonCol>Set</IonCol>
                        <IonCol>Weight</IonCol>
                        <IonCol>Reps</IonCol>
                      </IonRow>
                      {data[sessionExercise].map((ex:any) =>(
                        <IonRow key={ex.set}>
                          <IonCol>{Number(ex.set) + 1}</IonCol>
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