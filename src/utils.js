export function getChosenTodos(todos, searchValue, isSorted) {
	const filteredTodos = todos.filter((task) => task.title?.includes(searchValue));
	const filteredAndSortedTodos = filteredTodos.toSorted((a, b) => {
		if (a.title > b.title) {
			return 1;
		} else if (a.title < b.title) {
			return -1;
		} else return 0;
	});

	return !isSorted ? filteredTodos : filteredAndSortedTodos;
}
