package com.books.library

import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class PersonService(private val personRepository: PersonRepository) {

    fun savePerson(person: Person): Person {
        return personRepository.save(person)
    }

    fun getPersonById(id: Long): Person? {
        return personRepository.findById(id).orElse(null)
    }

    fun getAllPersons(): List<Person> {
        return personRepository.findAll()
    }

    fun moreDetailsById(id: Long): PersonDetailsDTO {
        val person = personRepository.findById(id).orElseThrow {
            EntityNotFoundException("Person $id not found.")
        }

        return PersonDetailsDTO(
            person.firstName,
            person.lastName,
            person.personAge,
            person.personGender,
            person.personEmail
        )
    }



    fun editPersonById(id: Long, updatedPerson: Person): Person?{
        val editedPerson = personRepository.findById(id)
        editedPerson.get().firstName= updatedPerson.firstName
        editedPerson.get().lastName= updatedPerson.lastName

        personRepository.save(editedPerson.get())

        return personRepository.findById(id).orElse(null)
    }

    fun deletePerson(id: Long) {
        personRepository.deleteById(id)
    }
}
