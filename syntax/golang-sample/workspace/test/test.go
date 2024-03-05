package test

func Add[T int | float32 | float64](a, b T) T {
	return a + b
}
