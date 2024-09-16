import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { createAnimal, getAnimais } from '../actions '';
import styles from '../styles/animals.module.css';

export default function AnimalsPage() {
    const [animais, setAnimais] = useState([]);
    const [formData, setFormData] = useState({
        especie: '',
        brinco: '',
        dataNascimento: '',
        peso: '',
        dataDesmame: '',
        dataRegistro: '',
    });

    useEffect(() => {
        async function fetchAnimais() {
            const animaisData = await getAnimais();
            setAnimais(animaisData);
        }
        fetchAnimais();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const animal = {
            ...formData,
            dataNascimento: new Date(formData.dataNascimento),
            peso: parseFloat(formData.peso),
            dataDesmame: formData.dataDesmame ? new Date(formData.dataDesmame) : null,
            dataRegistro: new Date(formData.dataRegistro),
        };
        await createAnimal(animal);
        setFormData({
            especie: '',
            brinco: '',
            dataNascimento: '',
            peso: '',
            dataDesmame: '',
            dataRegistro: '',
        });

        // Refresh the list of animals after adding a new one
        const animaisData = await getAnimais();
        setAnimais(animaisData);
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.sectionTitle}>Animais</h1>
            
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Adicionar Animal</h2>
                <form onSubmit={handleSubmit} className="space-y-5 mb-10">
                    <input
                        type="text"
                        name="especie"
                        value={formData.especie}
                        onChange={handleChange}
                        placeholder="Espécie"
                        className={styles.formInput}
                    />

                    <input
                        type="text"
                        name="brinco"
                        value={formData.brinco}
                        onChange={handleChange}
                        placeholder="Brinco"
                        className={styles.formInput}
                    />

                    <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        placeholder="Data de Nascimento"
                        className={styles.formInput}
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        placeholder="Peso"
                        className={styles.formInput}
                    />

                    <input
                        type="date"
                        name="dataDesmame"
                        value={formData.dataDesmame}
                        onChange={handleChange}
                        placeholder="Data de Desmame"
                        className={styles.formInput}
                    />

                    <input
                        type="date"
                        name="dataRegistro"
                        value={formData.dataRegistro}
                        onChange={handleChange}
                        placeholder="Data de Registro"
                        className={styles.formInput}
                    />

                    <button
                        type="submit"
                        className={styles.formButton}
                    >
                        Criar Animal
                    </button>
                </form>
            </div>

            <div className={styles.animalList}>
                <h2>Animais Cadastrados</h2>
                <ul>
                    {animais.map((animal) => (
                        <li key={animal.id} className={styles.animalListItem}>
                            <div>Espécie: {animal.especie}</div>
                            <div>Brinco: {animal.brinco}</div>
                            <div>Data de Nascimento: {format(new Date(animal.data_nascimento), 'dd-MM-yyyy')}</div>
                            <div>Peso: {animal.peso}</div>
                            <div>Data de Desmame: {animal.data_desmame ? format(new Date(animal.data_desmame), 'dd-MM-yyyy') : 'N/A'}</div>
                            <div>Data de Registro: {format(new Date(animal.data_registro), 'dd-MM-yyyy')}</div>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
