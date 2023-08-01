package com.books.library

import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin

@RestController

@RequestMapping("/api/persons")
class PersonController(private val personService: PersonService) {

    @PostMapping
    fun createPerson(@RequestBody person: Person): ResponseEntity<Person> {
//        println("enters here "+ person.toString())
        val savedPerson = personService.savePerson(person)
        return ResponseEntity( savedPerson, HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getPersonById(@PathVariable id: Long): ResponseEntity<Person> {
        val person = personService.getPersonById(id)
        return if (person != null) {
            ResponseEntity(person, HttpStatus.OK)
        }else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    /**
     * create request to edit
     */

    @PatchMapping("/{id}")
    fun editPersonById(@PathVariable id: Long, @RequestBody updatedPerson: Person): ResponseEntity<Person> {
        val editedPerson = personService.editPersonById(id, updatedPerson)
        return if (editedPerson != null) {
            ResponseEntity(editedPerson, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping
    fun getAllPersons(): ResponseEntity<List<Person>> {
        val persons = personService.getAllPersons()
        return ResponseEntity(persons, HttpStatus.OK)
    }

    @GetMapping("/details/{id}")
    fun moreDetailsById(@PathVariable id: Long): ResponseEntity<PersonDetailsDTO> {
        val personDetails = personService.moreDetailsById(id)

        return if (personDetails != null) {
            ResponseEntity.ok(personDetails)
        } else {
            return ResponseEntity.notFound().build()
        }
    }


    @CrossOrigin(origins = ["http://localhost:4200"])
    @DeleteMapping("/{id}")
    fun deletePerson(@PathVariable id: Long): ResponseEntity<Unit> {
        personService.deletePerson(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}
