import { OrderedMap, Map } from 'immutable';

export function generateId() {
  return Date.now()
}

export function fbDatatoEntities(data, RecordEvent = Map) { 
  return (OrderedMap(data)).mapEntries(([uid, value]) => (
    [uid, RecordEvent(value).set('uid', uid)]
  ));
}