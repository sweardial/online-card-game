import React from 'react';
import { useSelector } from 'react-redux';
import AttackingUserAction from './AttackingUserAction';
import DefensiveUserAction from './DenfesiveUserAction';

const Action = () => {
  const uid = useSelector(state => state.id.uid);
  const attackingUid = useSelector(state => state.id.attackingUid);
  return uid === attackingUid ? (
    <AttackingUserAction></AttackingUserAction>
  ) : (
    <DefensiveUserAction></DefensiveUserAction>
  );
};

export default Action;
