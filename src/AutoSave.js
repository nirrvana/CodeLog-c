import debounce from 'lodash.debounce';

export const handleInputData = (state) => (event) => {
  this.setState({
    [state]: event.target.value,
  });
  this.handleEditDataSave();
};
export const handleEditDataSave = () => {
  const { title, concept, Strategy, handling, Referenece, Lesson } = this.state;

  let content = concept + Strategy + handling + Referenece + Lesson;
  // 로컬 스토리지에 저장 데이터 저장
  localStorage.setItem(
    'PostSave',
    JSON.stringify({ title: title, content: content }),
  );
};

debounce(handleEditDataSave, 1000);
