import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  }
});

export const TicketPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ display: 'flex', gap: '20px', marginTop: '24px', marginHorizontal: '26px' }}>
        <Text style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginHorizontal: 'auto', marginBottom: '8px' }}>Carta de agradecimento</Text>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>    Nosso projeto interdisciplinar deste semestre exigiu muito de todos nós, por ter sido um desenvolvimento completo e extenso, com diversos temas que foram abordados durante o todo o curso. Portanto, em nome dos integrantes do grupo Eduardo Amorim, Higor Vitalino, Lucas da Silva, Nicolas Ricciardi e Victor Goya.</Text>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>    Agradecemos aos nossos orientadores deste semestre, Valdir morales e Vanderson Gomes, por conduzir o nosso trabalho e desenvolvimento.</Text>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>    A todos os demais professores do curso de Análise e Desenvolvimento de Sistemas da Universidade Cruzeiro do Sul, pela excelência da qualidade técnica de cada um, no decorrer de todos os semestres.</Text>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>    Também agradecemos a todos os colegas de curso, mas principalmente os integrantes de grupo, pela oportunidade do convívio, cooperação, contribuição e dedicação mútua durante o semestre.</Text>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>    E a todos que participaram, direta ou indiretamente do desenvolvimento deste trabalho.</Text>
        <Image src={'./logo.png'} style={{ marginTop: '24px', marginHorizontal: 'auto', width: '220px' }}/>
      </View>
    </Page>
  </Document>
);