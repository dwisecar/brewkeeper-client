export const initialState = {
	user: false,
	recipes: [],
	styles:[],
	fermentables: [],
	hops: [],
	yeasts: []
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_USER':
			return {
				...state,
				user: action.value
			};
		case 'SET_RECIPES':
			return {
				...state,
				recipes: action.value
			};
		case 'ADD_RECIPE':
			return {
				...state,
				recipes: [action.value, ...state.recipes]
			};
		case 'DELETE_RECIPE':
			const newRecipes = state.recipes.filter(r => r.id !== action.value.id)
			return {
				...state,
				recipes: newRecipes
			};

		case 'SET_STYLES':
			return {
				...state,
				styles: action.value
			};

		case 'SET_FERMENTABLES':
			return {
				...state,
				fermentables: action.value
			};

		case 'SET_HOPS':
			return {
				...state,
				hops: action.value
			};

		case 'SET_YEASTS':
			return {
				...state,
				yeasts: action.value
			};
		
		default:
			return state;
	}
};

