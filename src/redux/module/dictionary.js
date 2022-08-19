// 날리고 다시 시작해 볼 것
import { firestore } from "../../firebase";

const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const DELETE = "dictionary/DELETE";
const UPDATE = "dictionary/UPDATE";

const initailState = {
  list: [
    {
      id: "0",
      dict: "サンプル",
      furigana: "さんぷる",
      dictKo: "견본(샘플)",
      example: "サンプルです。",
      exampleKo: "견본입니다.",
    },
  ],
};

const dictionary_db = firestore.collection("dictionary");

export const loadDictionary = (dictionary) => {
  return {
    type: LOAD,
    dictionary,
  };
};

export const createDictionary = (dictionary) => {
  return {
    type: CREATE,
    dictionary,
  };
};

export const deleteDictionary = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const updateDictionary = (id) => {
  return {
    type: UPDATE,
    id,
  };
};

export const loadDictionaryFB = () => {
  return function (dispatch) {
    dictionary_db.get().then((docs) => {
      let dictionary_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          dictionary_data = [...dictionary_data, { id: doc.id, ...doc.data() }];
        }
      });
      dispatch(loadDictionary(dictionary_data));
    });
  };
};

export const createDictionaryFB = (dictionary) => {
  return function (dispatch) {
    let dictionary_data = dictionary;

    dictionary_db
      .add(dictionary_data)
      .then((docRef) => {
        dictionary_data = { ...dictionary_data, id: docRef.id };
        // dispatch(createDictionary(dictionary_data));
      })
      .catch((err) => {
        alert("create err");
      });
  };
};

export const deleteBucketFB = (id) => {
  return function (dispatch) {
    dictionary_db
      .doc(id)
      .delete()
      .then((res) => {
        dispatch(deleteDictionary(id));
      });
  };
};

export const updateBucketFB = (id, dictionary) => {
  return function (dispatch) {
    dictionary_db.doc(id).update(dictionary);
  };
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case LOAD: {
      if (action.dictionary.length > 0) {
        return { list: action.dictionary };
      }
      return state;
    }
    case CREATE: {
      const new_list = [...state.list, action.dictionary];
      return { list: new_list };
    }
    case DELETE: {
      const new_list = state.list.filter(({ id }) => {
        return id !== action.id;
      });

      return {
        list: new_list,
      };
    }

    case UPDATE: {
      //   const dictionary_list = state.list.map((props,idx) => {
      //       if (idx === action.id) {
      //         return
      //     }
      // })
      return console.log("update실행!");
    }
    default:
      return state;
  }
};

export default reducer;
