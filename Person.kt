package com.books.library

import javax.persistence.*

@Entity
data class Person(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "first_name")
    var firstName: String,

    @Column(name = "last_name")
    var lastName: String,

    @Column(name = "age")
    var personAge: Int? = null,

    @Column(name = "pgender")
    var personGender: String? = null,

    @Column(name = "pemail")
    var personEmail: String? = null
)
