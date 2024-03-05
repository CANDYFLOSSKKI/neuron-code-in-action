module golang-sample

go 1.21

require (
	syntax v1.0.0
	workspace v1.0.0
)

replace (
	syntax => ./syntax
	workspace => ./workspace
)