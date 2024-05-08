// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewPetitionForm from "/NewPetitionForm";
import PetitionList from "/PetitionList";
import PetitionDetail from "/PetitionDetail";

const Petition = () => {
  // 예시 데이터, 후에 API로 대체할 수 있습니다.
  const [petitions, setPetitions] = useState([
    {
      id: 1,
      title: "첫 번째 이의신청",
      userName: "사용자1",
      carNumber: "123가 4567",
      content: "첫 번째 이의신청의 내용입니다.",
    },
    // 추가적인 예시 데이터들
  ]);

  const handleNewPetition = (newPetition) => {
    setPetitions([...petitions, { ...newPetition, id: petitions.length + 1 }]);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <NewPetitionForm onSubmit={handleNewPetition} />
          </Route>
          <Route path="/petitions" exact>
            <PetitionList petitions={petitions} />
          </Route>
          <Route path="/petitions/:id">
            <PetitionDetail
              petition={petitions.find((petition) => petition.id === id)}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Petition;
