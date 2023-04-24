import { Pet } from '@/application/pets/entities/pet'

export class PetViewModel {
  static toHTTP(pet: Pet) {
    const org = pet.org
      ? {
          id: pet.org.id,
          address: pet.org.address,
          cep: pet.org.cep,
          city: pet.org.city,
          email: pet.org.email,
          name: pet.org.name,
          phone: pet.org.phone,
        }
      : undefined

    return {
      id: pet.id,
      orgId: pet.orgId,
      name: pet.name,
      age: pet.age,
      description: pet.description,
      energy: pet.energy,
      independence: pet.independence,
      size: pet.size,
      type: pet.type,
      adoptionRequirements: pet.adoptionRequirements,
      images: pet.images,
      org,
    }
  }
}
