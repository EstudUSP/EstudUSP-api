/* eslint-disable max-len */
import { DataSource } from 'typeorm';
import { Subject } from '../schema/subject';
import { injectable } from 'inversify';
import ISeed from '.';

@injectable()
export default class CreateSubjectsSeed implements ISeed {
  public async run(connection: DataSource): Promise<void> {
    // @TODO: fazer inserts distribuídos
    try {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Subject)
        .values([
          { id: 'ACH2055', title: 'Organização e Arquitetura de Computadores II', semester: 4, previewImg: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988' },
          { id: 'ACH2044', title: 'Sistemas Operacionais', semester: 4, previewImg: 'https://cdn.pixabay.com/photo/2016/10/15/15/17/digital-1742679_960_720.jpg' },
          { id: 'ACH2004', title: 'Banco de Dados I', semester: 4, previewImg: 'https://cdn.pixabay.com/photo/2023/05/26/06/29/ai-generated-8018846_960_720.png' },
          { id: 'ACH2026', title: 'Redes de Computadores', semester: 4, previewImg: 'https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227_1280.jpg' },
          { id: 'ACH2036', title: 'Métodos Quantitativos para Análise Multivariada', semester: 4, previewImg: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29' },
          { id: 'ACH2006', title: 'Engenharia de Sistemas de Informação I', semester: 6, previewImg: 'https://images.unsplash.com/photo-1618422168439-4b03d3a05b15' },
          { id: 'ACH0042', title: 'Resolução de Problemas II', semester: 6, previewImg: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd' },
        ])
        .execute();
    } catch (err) {
      console.error(`Error during seeds execution: ${err.message}`);
    }
  }
}
