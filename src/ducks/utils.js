import { OrderedMap, Map } from 'immutable';

export function generateId() {
  return Date.now()
}

export function fbDatatoEntities(data, RecordEvent = Map) { 
  console.log(`------- nOrderedMap(data):  `,OrderedMap(data))
  console.log(`------- nOrderedMap(data):  `,OrderedMap(data).toJS())
  return (OrderedMap(data)).mapEntries(([uid, value]) => (
    [uid, RecordEvent(value).set('uid', uid)]
  ));
}