package com.books.library

data class PersonDetailsDTO(
    val firstName: String,
    val lastName: String,
    val personAge: Int? = null,
    val personGender: String? = null,
    val personEmail: String? = null
)
