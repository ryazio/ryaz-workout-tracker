import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { get } from '../data/ionicStorage';
import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';


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
    return workoutObj.name;
  };

  const getExerciseNameById = (id: string) => {
    const exerciseObj = exerciseData.find((exercise: any) => exercise.id == id) || { name: ''};
    return exerciseObj.name; 
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <IonContent className="ion-padding">
      {historyData.length && historyData.map((workout: any) => {
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