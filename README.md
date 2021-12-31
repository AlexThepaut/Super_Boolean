# Super_Boolean
Module for dealing with MOTHERFUCKING boolean

## NOT
| True     | False   | MF True | MF False |
|----------|---------|---------|----------|
| MF False | MF True | True    | False    |

## OR
|          | True    | False    | MF True | MF False |
|----------|---------|----------|---------|----------|
| True     | True    | True     | MF True | False    |
| False    | True    | False    | True    | MF False |
| MF True  | MF True | True     | MF True | null     |
| MF False | False   | MF False | null    | MF False |

## AND
|          | True  | False | MF True | MF False |
|----------|-------|-------|---------|----------|
| True     | True  | False | True    | False    |
| False    | False | False | True    | False    |
| MF True  | True  | True  | MF True | null     |
| MF False | False | False | null    | MF False |

## XOR
|          | True     | False | MF True | MF False |
|----------|----------|-------|---------|----------|
| True     | True     | False | null    | MF False |
| False    | False    | False | True    | null     |
| MF True  | null     | True  | True    | True     |
| MF False | MF False | null  | True    | MF False |