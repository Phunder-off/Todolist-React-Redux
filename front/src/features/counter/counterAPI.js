// Une fonction simulée pour imiter la création d'une demande de données asynchrones
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
